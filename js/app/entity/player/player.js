define(function (require) {
    "use strict";
    var THREE       = require('three'),
        pointerLock = require('pointerLockControls'),
        conzole     = require('conzole'),
        camera      = require('camera'),
        WatchJS     = require('watch'),
        socket      = require('net/network');

    /** @instance THREE.Mesh **/
    var player   = pointerLock.getObject();
    player.name  = 'Player';
    player.netId = Math.random();

    var v = 1;

    player.move = {
        forward: false,
        backward: false,
        left: false,
        right: false
    };

    function getPlayerInfo(player) {
        return {
            id: player.netId,
            rot: {
                y: player.rotation.y,
                x: player.children[0].rotation.x
            },
            pos: player.position
        }
    }

    function sendPlayerData() {
        socket.emit('message', getPlayerInfo(this));
    }

    WatchJS.watch(player.rotation, sendPlayerData.bind(player));
    WatchJS.watch(player.children[0].rotation, sendPlayerData.bind(player));
    WatchJS.watch(player.position, sendPlayerData.bind(player));

    player.update = function (d) {
        if (player.move.forward) player.translateZ(-v * d);
        if (player.move.backward) player.translateZ(v * d);
        if (player.move.left) player.translateX(-v * d);
        if (player.move.right) player.translateX(v * d);
    };

    return player;
});