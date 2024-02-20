class Db {
    user = {
        findFirst: (_) => undefined,
        findUnique: (_) => undefined,
        create: (_) => { return { id: 'id' } }
    }

    product = {
        findFirst: (_) => undefined,
        findUnique: (_) => undefined
    }

    cart = {
        findFirst: (_) => undefined,
        findUnique: (_) => undefined,
        findMany: (_) => undefined,
        create: (_) => { return { id: 'id' } }
    }
}

module.exports = { Db }
