export function random(n : number){
    const a = "asqweqrretuyriyuuiplkjhggfssazcxn9746552771534399sbxvvxfcttwuwioppldjgdfdbcnmmzvdaewteuitoyplughsfscxbnvdnsmmzbzvxccvdsklaoqowurtfrdvsh";
    const length = a.length;
    let ans = "";
    for(let i=0;i<n;i++){
        ans += a[Math.floor((Math.random() * length))];
    }
    return ans;
}