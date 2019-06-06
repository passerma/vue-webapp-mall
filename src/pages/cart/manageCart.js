import storage from 'assets/js/storage';

export const getCart = () => {
    return storage.get('product',[]);
};
export const getCartShop = (id) => {
    return storage.get(id,[]);
};
export const getProductParameter = (id) => {
    return new Promise(resolve => {
        resolve(storage.get(id,{}));
    });
};
export const getProductParameterNone = (id) => {
    return (storage.get(id,{}));
};
export const delProductMethod1 = (id,shop) => {
    id.map((item) => {
        getProductParameter(item).then(data => {
            if(data.isSelect){
                var isSelectProduct = item;
                storage.remove(item);
                shop.map((item) => {
                    var isSelectSeller = item;
                    let product = storage.get(item,'');
                    getProductParameter(item).then(data => {
                        data.map((item) => {
                            if(item === isSelectProduct){
                                let index = product.indexOf(item);
                                product.splice(index, 1);
                                storage.set(isSelectSeller,product);
                                if(!product.length){
                                    storage.remove(isSelectSeller);
                                    let productAll = getCart();
                                    let index2 = productAll.indexOf(isSelectSeller);
                                    productAll.splice(index2, 1);
                                    storage.set('product',productAll);
                                    if(!productAll.length){
                                        storage.remove('product');
                                    }
                                }
                            }
                        })
                    })
                })
            }
        })
    });
};
function delProductId(id) {
    if(getCartShop(id).isSelect === true){
        return new Promise(resolve => {
            storage.remove(id);
            resolve(id);
        })
    } else {
        return new Promise(resolve => {
            resolve(undefined);
        })
    }
}
export const delProductMethod = (id,shop) => {
    let allPromise = [];
    id.map((item) => {
        allPromise.push(delProductId(item));
    });
    Promise.all(allPromise).then(data => {
       console.log(data);
       shop.map((item) => {
           var isSelectSeller = item;
           let product = storage.get(item,'');
           data.map((item) => {
               if(product.includes(item)){
                   let index = product.indexOf(item);
                   console.log(index);
                   product.splice(index, 1);
                   storage.set(isSelectSeller,product);
                   if(!product.length){
                       storage.remove(isSelectSeller);
                       let productAll = getCart();
                       let index2 = productAll.indexOf(isSelectSeller);
                       productAll.splice(index2, 1);
                       storage.set('product',productAll);
                       if(!productAll.length){
                           storage.remove('product');
                       }
                   }
               }
           })
       })
    })
};
export const selectProtect = (id, select) => {
    let product = storage.get(id,'');
    let productSele = product.isSelect;
    if(select === true){
        productSele = true;
        product.isSelect = productSele;
        storage.set(id,product)
    } else if(select === false) {
        productSele = false;
        product.isSelect = productSele;
        storage.set(id,product);
    }
};
export const selectProductFun = (id) => {
    let product = storage.get(id,'');
    let productSele = product.isSelect;
    if(productSele === true){
        productSele = false;
        product.isSelect = productSele;
        storage.set(id,product)
    } else if(productSele === false) {
        productSele = true;
        product.isSelect = productSele;
        storage.set(id,product);
    }

};
export const addProductNum = (id, type) => {
    let product = storage.get(id,'');
    let productNum = product.num;
    if (type === 'add'){
        productNum += 1;
        product.num = productNum;
        storage.set(id,product)
    } else if(type === 'subtract'){
        if (productNum !== 1){
            productNum -= 1;
            product.num = productNum;
            storage.set(id,product)
        }
    } else {
        productNum = type;
        product.num = productNum;
        storage.set(id,product)
    }
};
