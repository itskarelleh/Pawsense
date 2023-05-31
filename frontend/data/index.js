export const fakePets = [
    { 'id': '1', name: 'Tabby', type: 'cat', birthdate: '01/01/2022', sex: 'F', photo: 'https://images.pexels.com/photos/51439/pexels-photo-51439.jpeg?auto=compress&cs=tinysrgb&w=400',
        medications: null, events: ['1', '2'], mood: '😀'},
    { 'id': '2', name: 'George', type: 'cat', birthdate: '01/01/2019', sex: 'M', photo: 'https://images.pexels.com/photos/160839/cat-animal-love-pet-160839.jpeg?auto=compress&cs=tinysrgb&w=400https://images.pexels.com/photos/51439/pexels-photo-51439.jpeg?auto=compress&cs=tinysrgb&w=400'},
    { 'id': '3', name: 'George Jr.', type: 'cat', birthdate: '04/05/2023', sex: 'M', photo: 'https://images.pexels.com/photos/12109412/pexels-photo-12109412.jpeg?auto=compress&cs=tinysrgb&w=400'},
    { 'id': '4', name: 'Curtis', type: 'cat', birthdate: '04/05/2008', sex: 'M', photo: 'https://images.pexels.com/photos/3652805/pexels-photo-3652805.jpeg?auto=compress&cs=tinysrgb&w=400'},
]

export const fakeEvents = [
    { id: '1', name: 'Grooming Day', type: 'grooming', date: '06/15/2023', pets: 'all'},
    { id: '2', name: 'Vet Visit', type: 'vet' ,date: '07/01/2023', pets: ['Tabby', 'Curtis']},
    { id: '3', name: 'Vet Visit', type: 'vet', date: '01/01/2024', pets: ['Curtis']}
]

export const moodOptions = [
    { value: 'excited', label: '😃' },
    { value: 'happy', label: '😊' },
    { value: 'okay', label: '😐' },
    { value: 'naughty', label: '😈' },
    { value: 'angry', label: '😢' },
    { value: 'sad', label: '😢' },
    { value: 'scared', label: '😱' },
    { value: 'mad', label: '😡' },
]
