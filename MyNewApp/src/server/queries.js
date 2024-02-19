import HttpError from '@wasp/core/HttpError.js'

export const getChild = async ({ id }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const child = await context.entities.Child.findUnique({
    where: { id },
    include: { transactions: true }
  })

  if (!child) { throw new HttpError(404, `Child with id ${id} not found`) }

  return child
}

export const getTransactions = async ({ childId }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const transactions = await context.entities.Transaction.findMany({
    where: {
      childId
    }
  });

  return transactions;
}
