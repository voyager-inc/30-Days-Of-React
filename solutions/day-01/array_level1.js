const emptyArray = []
const webTechs = [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Redux',
    'Node',
    'MongoDB',
]
console.log(webTechs.length)
firstItem = webTechs[0]
lastItem = webTechs[webTechs.length -1]
middleIndex = Math.floor(webTechs.length/2)
console.log(firstItem, lastItem, middleIndex)

const mixedDataTypes = [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Redux',
    'Node',
    'MongoDB',
    5, 
    6,
    7
]
console.log(mixedDataTypes.length)

const itCompanies = [
    'Facebook', 
    'Google', 
    'Microsoft', 
    'Apple', 
    'IBM', 
    'Oracle',
    'Amazon'
]
console.log(itCompanies)
console.log(itCompanies.length)
console.log(itCompanies[0])
console.log(itCompanies[Math.floor(itCompanies.length/2)])
console.log(itCompanies[itCompanies.length-1]) 
itCompanies.forEach((number, i) => {
    console.log(number, i)
})

//12. Print Facebook, Google, Microsoft, Apple, IBM, Oracle, and Amazon
const t = new Intl.ListFormat().format(itCompanies);
console.log(t + " are big tech companies")

//13. Check if a certain company exists in the itCompanies array. If it exist return the company else return a company is not found
const company = 'Fakebook'
console.log(itCompanies.includes(company) ? company : 'a company is not found')

//14. Filter out companies which have more than one 'o' without the filter method
let ooCompany = []
itCompanies.forEach(company =>{
    if (company.split('o').length > 2){
        ooCompany.push(company)
    }
})

console.log(ooCompany)

//15. Sort the array using sort() method
itCompanies.sort((a,b) => a-b)
console.log(itCompanies)

test = [2,23,5,1,2,6,7,1,2,7,2,3,1351,7,13,23,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
test.sort((a,b)=> b-a)
console.log(test)

//Slice out the first 3 companies from the array
console.log(itCompanies.slice(0, 3))
//Slice out the last 3 companies from the array
console.log(itCompanies.slice(-3))
