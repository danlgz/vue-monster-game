const getAttackValue = () => parseInt(Math.random() * 10);
const getSpecialAttackValue = () => getAttackValue() + 5;

new Vue({
    el: '#app',
    data: {
        playerLife: 100,
        monsterLife: 100,
        gaming: true,
        history: [],
        hasWin: false,
    },
    watch: {
        monsterLife(value) {
            this.valid(value, 'you')
        },
        playerLife(value) {
            this.valid(value, 'monster')
        }
    },
    methods: {
        getScore(type, score) {
            return `${type == 'heal' ? '+' : '-'}${score}`;
        },
        addHistory(type, player, score) {
            this.history = [
                {
                    type: type,
                    player: player,
                    score: score,
                },
                ...this.history,
            ]
        },
        valid(value, name) {
            if (this.hasWin) return;

            if (value == 0) {
                this.hasWin = true;
                setTimeout(() => {
                    alert(`${name} win!`);
                    this.finishGame();
                }, 100);
            }
        },
        playerAction(type, score) {
            this.addHistory(type, 'player', score);
        },
        monsterAction(type, score) {
            this.addHistory(type, 'monster', score);
        },
        finishGame() {
            this.gaming = false;
            this.playerLife = 100;
            this.monsterLife = 100;
            this.history = [];
            this.hasWin = false;
        },
        attack(special = false) {
            const type = `${special && 'special' || '' } attack`;
            let score = special ? getSpecialAttackValue() : getAttackValue();
            if (this.monsterLife - score < 0) score = this.monsterLife;
            this.monsterLife -= score;
            this.playerAction(type, score);

            score = special ? getSpecialAttackValue() : getAttackValue();
            if (this.playerLife - score < 0) score = this.playerLife;
            this.playerLife -= score;
            this.monsterAction(type, score);
        },
        heal() {
            let score = getSpecialAttackValue();
            if (score + this.monsterLife > 100) score = 100 - this.monsterLife;
            this.monsterLife += score;
            this.playerAction('heal', score);

            score = getSpecialAttackValue();
            if (score + this.playerLife > 100) score = 100 - this.playerLife;
            this.playerLife += score;
            this.monsterAction('heal', score);
        }
    }
})