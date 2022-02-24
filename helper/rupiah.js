function rupiah(values) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(values)
}
// console.log(rupiah(5000));

module.exports = {rupiah}