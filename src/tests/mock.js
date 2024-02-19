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
}

module.exports = { Db }
