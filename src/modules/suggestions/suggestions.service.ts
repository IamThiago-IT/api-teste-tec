import { prisma } from '../../core/database';

function monthsBetween(now: Date, target: Date) {
  const years = target.getFullYear() - now.getFullYear();
  const months = target.getMonth() - now.getMonth();
  return years * 12 + months;
}

/**
 * Compute monthly contribution needed to reach targetValue given currentWealth,
 * monthlyRate (decimal), and n months.
 * Formula: FV = PV*(1+i)^n + P * ( ( (1+i)^n -1 ) / i )
 * Solve for P:
 * P = (FV - PV*(1+i)^n) * i / ( (1+i)^n -1 )
 */
export function computeMonthlyContribution(
  currentWealth: number,
  targetWealth: number,
  months: number,
  monthlyRate: number
): number {
  if (months <= 0) return 0; // evita divisão por zero
  const needed = targetWealth - currentWealth;
  if (needed <= 0) return 0;

  // taxa mensal como decimal (ex.: 0.005 = 0.5%)
  const rateFactor = monthlyRate > 0 ? Math.pow(1 + monthlyRate, months) - 1 : months;
  return monthlyRate > 0
    ? needed * monthlyRate / rateFactor
    : needed / months;
}


export const SuggestionsService = {
  async suggestForGoal(clientId: string) {
    const client = await prisma.client.findUnique({
      where: { id: clientId },
      include: { goals: true, wallet: true },
    });
    if (!client) return null;
    const walletTotal = client.wallet?.reduce((s: number, w: { totalWealth: number | null }) => s + (w.totalWealth || 0), 0) || 0;
    const now = new Date();

    const suggestions: any[] = [];

    for (const goal of client.goals || []) {
      const months = monthsBetween(now, new Date(goal.targetDate));
      const monthly = computeMonthlyContribution(walletTotal, Number(goal.targetValue), months, 4); // using default 4% a.a.
      if (!isFinite(monthly)) {
        suggestions.push({ goalId: goal.id, suggestion: 'Impossível calcular: prazo inválido' });
      } else {
        const monthsRounded = Math.max(1, months || 1);
        suggestions.push({
          goalId: goal.id,
          suggestion: `Ajuste a contribuição em R$ ${Math.ceil(monthly).toFixed(0)} por ${monthsRounded} meses para alcançar "${goal.title}".`,
          monthly: Math.ceil(monthly),
          months: monthsRounded,
        });
      }
    }

    return suggestions;
  }
};
