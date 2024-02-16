class Db {
    user = {
        findFirst: (_) => undefined,
        findUnique: (_) => undefined,
        create: (_) => { return { id: 'id' } }
    }
}

module.exports = { Db }
