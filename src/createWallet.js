// Importando as dependencias
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//Definir a rede
//Bitcoin - rede principal - mainnet
//testnet - rede de test
const network = bitcoin.networks.testnet

//Derivação de carteiras HD
const path = `m/49'/1'/0'/0`

//Criando o mnemonic - palavras de senha para a seed
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//Criando a raíz da carteira HD
let root = bip32.fromSeed(seed, network)

//criando uma conta
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAdress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Carteira gerada")
console.log("Endereço: ", btcAdress)
console.log("Chave Privada:", node.toWIF())
console.log("seed", mnemonic)


