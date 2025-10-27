// Objects can contain other objects:
const student = {
    name: "Maria Garcia",
    contact: {
        email: "maria@email.com",
        phone: "555-1234",
        address: {
            street: "123 Main St",
            city: "Toronto",
            country: "Canada"
        }
    },
    courses: ["Math", "Science", "History"]
}

// Accessing nested properties:
console.log(student.contact.email);
console.log(student.contact.address.city);
console.log(student.emergency.phone);

// Safe access to potentially missing properties:
console.log(student.contact?.address?.city);
console.log(student.emergency?.phone);

console.log(firstName, name);