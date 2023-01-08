import axios from 'axios';
import axiosRequest from './http.service';

// const domain = {
//     "data": [
//         {
//             "id": 1,
//             "name": "Technical",
//             "createdAt": "2022-12-26T09:28:43.877Z",
//             "updatedAt": "2022-12-26T09:28:43.877Z",
//             "deletedAt": null
//         },
//         {
//             "id": 2,
//             "name": "Business",
//             "createdAt": "2022-12-26T09:31:31.615Z",
//             "updatedAt": "2022-12-26T09:31:31.615Z",
//             "deletedAt": null
//         },
//         {
//             "id": 3,
//             "name": "Mangerial",
//             "createdAt": "2022-12-26T09:28:43.877Z",
//             "updatedAt": "2022-12-26T09:28:43.877Z",
//             "deletedAt": null
//         },
//         {
//             "id": 4,
//             "name": "Retail",
//             "createdAt": "2022-12-26T09:31:31.615Z",
//             "updatedAt": "2022-12-26T09:31:31.615Z",
//             "deletedAt": null
//         },
//         {
//             "id": 5,
//             "name": "BFSI",
//             "createdAt": "2022-12-26T09:28:43.877Z",
//             "updatedAt": "2022-12-26T09:28:43.877Z",
//             "deletedAt": null
//         },
//         {
//             "id": 6,
//             "name": "Communication",
//             "createdAt": "2022-12-26T09:31:31.615Z",
//             "updatedAt": "2022-12-26T09:31:31.615Z",
//             "deletedAt": null
//         }
//     ],
//     "message": "findAll"
// }

// const skills = {
//     "data": [
//         {
//             "id": 3,
//             "name": "php",
//             "domainMasterId": 1,
//             "createdAt": "2022-12-27T16:34:38.422Z",
//             "updatedAt": "2022-12-27T16:34:38.422Z",
//             "deletedAt": null,
//             "DomainMaster": {
//                 "id": 1,
//                 "name": "Technical",
//                 "createdAt": "2022-12-26T09:28:43.877Z",
//                 "updatedAt": "2022-12-26T09:28:43.877Z",
//                 "deletedAt": null
//             }
//         },
//         {
//             "id": 2,
//             "name": "java",
//             "domainMasterId": 1,
//             "createdAt": "2022-12-27T16:03:06.736Z",
//             "updatedAt": "2022-12-27T16:03:06.736Z",
//             "deletedAt": null,
//             "DomainMaster": {
//                 "id": 1,
//                 "name": "Technical",
//                 "createdAt": "2022-12-26T09:28:43.877Z",
//                 "updatedAt": "2022-12-26T09:28:43.877Z",
//                 "deletedAt": null
//             }
//         },
//         {
//             "id": 1,
//             "name": "javascript",
//             "domainMasterId": 1,
//             "createdAt": "2022-12-27T15:47:30.121Z",
//             "updatedAt": "2022-12-27T15:47:30.121Z",
//             "deletedAt": null,
//             "DomainMaster": {
//                 "id": 1,
//                 "name": "Technical",
//                 "createdAt": "2022-12-26T09:28:43.877Z",
//                 "updatedAt": "2022-12-26T09:28:43.877Z",
//                 "deletedAt": null
//             }
//         },
//         {
//             "id": 4,
//             "name": "team",
//             "domainMasterId": 3,
//             "createdAt": "2022-12-27T16:34:38.422Z",
//             "updatedAt": "2022-12-27T16:34:38.422Z",
//             "deletedAt": null,
//             "DomainMaster": {
//                 "id": 3,
//                 "name": "Mangerial",
//                 "createdAt": "2022-12-26T09:28:43.877Z",
//                 "updatedAt": "2022-12-26T09:28:43.877Z",
//                 "deletedAt": null
//             }
//         },
//         {
//             "id": 5,
//             "name": "internal",
//             "domainMasterId": 3,
//             "createdAt": "2022-12-27T16:03:06.736Z",
//             "updatedAt": "2022-12-27T16:03:06.736Z",
//             "deletedAt": null,
//             "DomainMaster": {
//                 "id": 3,
//                 "name": "Mangerial",
//                 "createdAt": "2022-12-26T09:28:43.877Z",
//                 "updatedAt": "2022-12-26T09:28:43.877Z",
//                 "deletedAt": null
//             }
//         },
//         {
//             "id": 6,
//             "name": "excel",
//             "domainMasterId": 2,
//             "createdAt": "2022-12-27T15:47:30.121Z",
//             "updatedAt": "2022-12-27T15:47:30.121Z",
//             "deletedAt": null,
//             "DomainMaster": {
//                 "id": 2,
//                 "name": "Business",
//                 "createdAt": "2022-12-26T09:28:43.877Z",
//                 "updatedAt": "2022-12-26T09:28:43.877Z",
//                 "deletedAt": null
//             }
//         },
//         {
//             "id": 7,
//             "name": "accounting",
//             "domainMasterId": 2,
//             "createdAt": "2022-12-27T15:47:30.121Z",
//             "updatedAt": "2022-12-27T15:47:30.121Z",
//             "deletedAt": null,
//             "DomainMaster": {
//                 "id": 2,
//                 "name": "Business",
//                 "createdAt": "2022-12-26T09:28:43.877Z",
//                 "updatedAt": "2022-12-26T09:28:43.877Z",
//                 "deletedAt": null
//             }
//         },
//         {
//             "id": 8,
//             "name": "sales",
//             "domainMasterId": 4,
//             "createdAt": "2022-12-27T15:47:30.121Z",
//             "updatedAt": "2022-12-27T15:47:30.121Z",
//             "deletedAt": null,
//             "DomainMaster": {
//                 "id": 4,
//                 "name": "Retail",
//                 "createdAt": "2022-12-26T09:28:43.877Z",
//                 "updatedAt": "2022-12-26T09:28:43.877Z",
//                 "deletedAt": null
//             }
//         },
//         {
//             "id": 9,
//             "name": "loans",
//             "domainMasterId": 5,
//             "createdAt": "2022-12-27T15:47:30.121Z",
//             "updatedAt": "2022-12-27T15:47:30.121Z",
//             "deletedAt": null,
//             "DomainMaster": {
//                 "id": 5,
//                 "name": "BFSI",
//                 "createdAt": "2022-12-26T09:28:43.877Z",
//                 "updatedAt": "2022-12-26T09:28:43.877Z",
//                 "deletedAt": null
//             }
//         },
//         {
//             "id": 10,
//             "name": "Email",
//             "domainMasterId": 6,
//             "createdAt": "2022-12-27T15:47:30.121Z",
//             "updatedAt": "2022-12-27T15:47:30.121Z",
//             "deletedAt": null,
//             "DomainMaster": {
//                 "id": 6,
//                 "name": "Communication",
//                 "createdAt": "2022-12-26T09:28:43.877Z",
//                 "updatedAt": "2022-12-26T09:28:43.877Z",
//                 "deletedAt": null
//             }
//         }

//     ],
//     "message": "findAll"
// }

export const getAllDomains = async () => {
    const response : any = axiosRequest
    .get("domain", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then()

    console.log(response)

    return response;
}

export const getAllSkills = async () => {
    const response : any = axiosRequest
    .get("skill", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })

    return response;
}


export const submitSkillForDomain = async (data: any) => {
    const response : any = axiosRequest
    .post("user-skill", data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })

    return response;
}