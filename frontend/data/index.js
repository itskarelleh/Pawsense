import { v4 as uuidv4 } from 'uuid';

export const fakePets = [
    { 'id': uuidv4(), name: 'Tabby', type: 'cat', birthdate: '01/01/2022', sex: 'F', photo: 'https://images.pexels.com/photos/51439/pexels-photo-51439.jpeg?auto=compress&cs=tinysrgb&w=400'},
    { 'id': uuidv4(), name: 'George', type: 'cat', birthdate: '01/01/2019', sex: 'M', photo: 'https://images.pexels.com/photos/160839/cat-animal-love-pet-160839.jpeg?auto=compress&cs=tinysrgb&w=400https://images.pexels.com/photos/51439/pexels-photo-51439.jpeg?auto=compress&cs=tinysrgb&w=400'},
    { 'id': uuidv4(), name: 'George Jr.', type: 'cat', birthdate: '04/05/2023', sex: 'M', photo: 'https://images.pexels.com/photos/12109412/pexels-photo-12109412.jpeg?auto=compress&cs=tinysrgb&w=400'},
    { 'id': uuidv4(), name: 'Curtis', type: 'cat', birthdate: '04/05/2008', sex: 'M', photo: 'https://images.pexels.com/photos/3652805/pexels-photo-3652805.jpeg?auto=compress&cs=tinysrgb&w=400'},
]

export const fakeEvents = [
    { id: uuidv4(), name: 'Grooming Day', date: '06/15/2023', pets: 'all'}
]