
var app = new Vue({
    el: '#app',
    data: {
        tickets: [],
        phoneNumber: "######",
        winner: false,
        previousWinners: [],
        ticketdrawing: false,
        uTickets: 1,
        winningNumber: -1,
        uName: "",
        wColor: 'red',
        drawing: false,
    },
    components: {},
    computed: {
        groupedTickets() {
            return this.tickets.reduce((a,b)=>{
                a[b] = a[b] || []
                a[b].push(b)
                return a
            },{})
        },
        ticketsCount() {
            return Object.keys(this.groupedTickets).map(k=>[k,this.groupedTickets[k].length])
        }
    },
    asyncComputed: {},
    watch: {},
    methods: {
        addTickets() {
            if(this.uName!=="" && this.uTickets>0) {
                this.tickets = this.tickets.concat(new Array(this.uTickets).fill(this.uName));
                this.uName = "";
                this.uTickets = 1;
            }
        },
        drawTicket() {
            if(this.tickets.length) {
                this.drawing = true;
                let n = 0;
                this.wColor = 'red';
                for (let i = 10; i < 100; i++) {
                    setTimeout(() => {
                        n = ~~(Math.random() * (this.tickets.length));
                        this.winner = this.tickets[n];
                        this.winningNumber = n;
                    }, 40000 / i)
                }
                setTimeout(() => {
                    this.previousWinners.push(this.winner);
                    this.removeTicket(this.winningNumber);
                    this.wColor = 'green';
                    this.drawing = false;
                }, 4050)
            }
        },
        undoDrawing(i) {
            this.tickets = this.tickets.concat(this.previousWinners[i]);
            this.winningNumber = -1;
            this.winner = false;
            this.previousWinners.splice(i, 1);
        },
        removeTicket(name) {
            this.tickets = this.tickets.filter(e=>e!=name);
        }
    },
    created() {
    }
});