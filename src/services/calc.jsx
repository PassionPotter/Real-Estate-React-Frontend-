export const getFee = (amount, price) => {
	return parseFloat(amount) * parseFloat(price) * 0.1;
}

export const getTotalWithFee = (amount, price) => {
	return parseFloat(amount) * parseFloat(price) * 1.1;
}

export const getTotalWithPurchasePrice = (purchasePrice, tokenQuantity) => {
	return parseFloat(purchasePrice)*tokenQuantity;
}

export const getPurchasePrice = (tokenValue, fee = 0) => {
	return parseFloat(tokenValue) + fee;
}