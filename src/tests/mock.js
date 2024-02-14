class Db {
    user = {
        findFirst: (_) => undefined,
        create: (_) => { return { id: 'id' } }
    }
}

module.exports = { Db }
