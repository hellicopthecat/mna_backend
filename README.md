```
mna_back
├─ .DS_Store
├─ README.md
├─ nodemon.json
├─ package-lock.json
├─ package.json
├─ prisma
│  ├─ migrations
│  │  └─ migration_lock.toml
│  └─ schema.prisma
├─ src
│  ├─ company
│  │  ├─ cancelRegistWorker
│  │  │  ├─ cancelRegistWorker.resolvers.ts
│  │  │  └─ cancelRegistWorker.typeDefs.graphql
│  │  ├─ company.resolvers.ts
│  │  ├─ company.typeDefs.graphql
│  │  ├─ connectCompany
│  │  │  ├─ connectCompany.resolvers.ts
│  │  │  └─ connectCompany.typeDefs.graphql
│  │  ├─ createCompany
│  │  │  ├─ createCompany.resolvers.ts
│  │  │  └─ createCompany.typeDefs.graphql
│  │  ├─ deleteCompany
│  │  │  ├─ deleteCompany.resolvers.ts
│  │  │  └─ deleteCompany.typeDefs.graphql
│  │  ├─ deleteManageAuth
│  │  │  ├─ deleteManageAuth.resolvers.ts
│  │  │  └─ deleteManageAuth.typeDefs.graphql
│  │  ├─ disconnectCompany
│  │  │  ├─ disconnectCompany.resolvers.ts
│  │  │  └─ disconnectCompany.typeDefs.graphql
│  │  ├─ managerAuth
│  │  │  ├─ managerAuth.resolvers.ts
│  │  │  └─ managerAuth.typeDefs.graphql
│  │  ├─ registWorker
│  │  │  ├─ registWorker.resolvers.ts
│  │  │  └─ registWorker.typeDefs.graphql
│  │  ├─ searchByCompanyName
│  │  │  ├─ searchByCompanyName.resolvers.ts
│  │  │  └─ searchByCompanyName.typeDefs.graphql
│  │  ├─ searchCompany
│  │  │  ├─ searchCompany.resolvers.ts
│  │  │  └─ searchCompany.typeDefs.graphql
│  │  └─ seeCompanyWorker
│  │     ├─ seeCompanyWorker.resolvers.ts
│  │     └─ seeCompanyWorker.typeDefs.graphql
│  ├─ companyAdress
│  │  ├─ companyAdress.typeDefs.graphql
│  │  ├─ editCompany
│  │  │  ├─ editCompany.resolvers.ts
│  │  │  └─ editCompany.typeDefs.graphql
│  │  └─ searchAdress
│  │     ├─ searchAdress.resolvers.ts
│  │     └─ searchAdress.typeDefs.graphql
│  ├─ equityLiabilities
│  │  ├─ createEnL
│  │  │  ├─ createEnL.resolvers.ts
│  │  │  └─ createEnL.typeDefs.graphql
│  │  ├─ deleteEnL
│  │  │  ├─ deleteEnL.resolvers.ts
│  │  │  └─ deleteEnL.typeDefs.graphql
│  │  ├─ editEnL
│  │  │  ├─ editEnL.resolvers.ts
│  │  │  └─ editEnL.typeDefs.graphql
│  │  ├─ equityLiabilities.resolvers.ts
│  │  ├─ equityLiabilities.typeDefs.graphql
│  │  └─ seeEnL
│  │     ├─ seeEnL.resolvers.ts
│  │     └─ seeEnL.typeDefs.graphql
│  ├─ incomeExpend
│  │  ├─ createInEx
│  │  │  ├─ createInEx.resolvers.ts
│  │  │  └─ createInEx.typeDefs.graphql
│  │  ├─ deleteInEx
│  │  │  ├─ deleteInEx.resolvers.ts
│  │  │  └─ deleteInEx.typeDefs.graphql
│  │  ├─ incomeExpend.resolvers.ts
│  │  ├─ incomeExpend.typeDefs.graphql
│  │  └─ updateInEx
│  │     ├─ updateInEx.resolvers.ts
│  │     └─ updateInEx.typeDefs.graphql
│  ├─ index.ts
│  ├─ prismaClient.ts
│  ├─ product
│  │  ├─ createProduct
│  │  │  ├─ createProduct.resolvers.ts
│  │  │  └─ createProduct.typeDefs.graphql
│  │  ├─ deleteProduct
│  │  │  ├─ deleteProduct.resolvers.ts
│  │  │  └─ deleteProduct.typeDefs.graphql
│  │  ├─ editProduct
│  │  │  ├─ editProduct.resolvers.ts
│  │  │  └─ editProduct.typeDefs.graphql
│  │  ├─ product.resolvers.ts
│  │  ├─ product.typeDefs.graphql
│  │  ├─ searchProduct
│  │  │  ├─ searchProduct.resolvers.ts
│  │  │  └─ searchProduct.typeDefs.graphql
│  │  ├─ seeCompanyProduct
│  │  │  ├─ seeCompanyProduct.resolvers.ts
│  │  │  └─ seeCompanyProduct.typeDefs.graphql
│  │  └─ seeProduct
│  │     ├─ seeProduct.resolvers.ts
│  │     └─ seeProduct.typeDefs.graphql
│  ├─ salary
│  │  ├─ createSalary
│  │  │  ├─ createSalary.resolvers.ts
│  │  │  └─ createSalary.typeDefs.graphql
│  │  ├─ editSalary
│  │  │  ├─ editSalary.resolvers.ts
│  │  │  └─ editSalary.typeDefs.graphql
│  │  ├─ salary.resolvers.ts
│  │  ├─ salary.typeDefs.graphql
│  │  ├─ salary.util.ts
│  │  └─ seeSalary
│  │     ├─ seeSalary.resolvers.ts
│  │     └─ seeSalary.typeDefs.graphql
│  ├─ schema.ts
│  ├─ shared
│  │  └─ shared.typeDefs.graphql
│  ├─ types.d.ts
│  ├─ user
│  │  ├─ createUser
│  │  │  ├─ createUser.resolvers.ts
│  │  │  └─ createUser.typeDefs.graphql
│  │  ├─ deleteUser
│  │  │  ├─ deleteUser.resolvers.ts
│  │  │  └─ deleteUser.typeDefs.graphql
│  │  ├─ editUser
│  │  │  ├─ editUser.resolvers.ts
│  │  │  └─ editUser.typeDefs.graphql
│  │  ├─ loginUser
│  │  │  ├─ loginUser.resolvers.ts
│  │  │  └─ loginUser.typeDefs.graphql
│  │  ├─ searchUser
│  │  │  ├─ searchUser.resolvers.ts
│  │  │  └─ searchUser.typeDefs.graphql
│  │  ├─ seeMyprofile
│  │  │  ├─ seeMyprofile.resolvers.ts
│  │  │  └─ seeMyprofile.typeDefs.graphql
│  │  ├─ seeUserProfile
│  │  │  ├─ seeUserProfile.resolvers.ts
│  │  │  └─ seeUserProfile.typeDefs.graphql
│  │  ├─ user.resolvers.ts
│  │  ├─ user.typeDefs.graphql
│  │  └─ user.util.ts
│  ├─ vacation
│  │  ├─ createVacation
│  │  │  ├─ createVacation.resolvers.ts
│  │  │  └─ createVacation.typeDefs.graphql
│  │  ├─ editVacation
│  │  │  ├─ editVacation.resolvers.ts
│  │  │  └─ editVacation.typeDefs.graphql
│  │  ├─ seeVacation
│  │  │  ├─ seeVacation.resolvers.ts
│  │  │  └─ seeVacation.typeDefs.graphql
│  │  ├─ vacation.resolvers.ts
│  │  ├─ vacation.typeDefs.graphql
│  │  └─ vacation.util.ts
│  └─ vacationDesc
│     ├─ createVacationDesc
│     │  ├─ createVacationDesc.resolvers.ts
│     │  └─ createVacationDesc.typeDefs.graphql
│     ├─ resetVacationDesc
│     │  ├─ resetVacationDesc.resolvers.ts
│     │  └─ resetVacationDesc.typeDefs.graphql
│     └─ vacationDesc.typeDefs.graphql
└─ tsconfig.json

```
