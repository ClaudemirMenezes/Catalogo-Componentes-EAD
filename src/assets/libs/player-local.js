/*
    Player simulado para abrir o catálogo direto no navegador (fora do AVA).
    O se_unasus_pack.js exige um SE_UNASUS_PLAYER_API; se já existir um player
    real em alguma janela pai, este arquivo não faz nada.
*/
(function () {
    try {
        if (window.parent && window.parent !== window && window.parent.SE_UNASUS_PLAYER_API) return
    } catch (e) {}

    var memoria = {}

    window.SE_UNASUS_PLAYER_API = {
        _STATE: { RUNNING: 'running', STOPPED: 'stopped' },
        state: 'running',
        debug: false,
        config: null,
        initialize: function () { return true },
        getLastError: function () { return '' },
        debugMessage: function () {},
        getBasename: function () { return 'catalogo_' },
        getPlayerName: function () { return 'player-local' },
        getPlayerUser: function () { return 'local' },
        getPlayerVersion: function () { return '0' },
        getVideoResolutions: function () { return [] },
        getItem: function (chave) {
            try { return localStorage.getItem(chave) } catch (e) { return chave in memoria ? memoria[chave] : null }
        },
        setItem: function (chave, valor) {
            try { localStorage.setItem(chave, valor) } catch (e) { memoria[chave] = valor }
            return true
        },
    }
})()
