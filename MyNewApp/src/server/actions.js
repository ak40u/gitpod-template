import HttpError from '@wasp/core/HttpError.js'

export const updateBalance = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const child = await context.entities.Child.findUnique({
    where: { id: args.childId }
  });
  if (!child) { throw new HttpError(404) };

  const { amount, description } = args;

  const updatedChild = await context.entities.Child.update({
    where: { id: args.childId },
    data: {
      balance: child.balance + amount,
      transactions: {
        create: {
          description,
          amount,
          type: amount >= 0 ? 'deposit' : 'withdrawal'
        }
      }
    },
    include: { transactions: true }
  });

  return updatedChild;
}

export const updateAllowance = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const child = await context.entities.Child.findUnique({
    where: { id: args.childId }
  });

  return context.entities.Child.update({
    where: { id: args.childId },
    data: { allowance: args.newAllowance }
  });
}
