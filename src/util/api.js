

const exchange_URL= "https://v6.exchangerate-api.com/v6/35f2fbd8af65b995ac7af2d1/pair";

const getRate= async (from , to) => {
    try {
        return await fetch(`${exchange_URL}/${from}/${to}`).then(res =>res.json()).then((res) => res.conversion_rate);
    
    } catch (error) {
        console.log( "Failed get API :",error)
    }
    
}

export {getRate}
