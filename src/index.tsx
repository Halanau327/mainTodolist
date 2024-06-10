const course = {
    name: "Maxim",
    age: 48,
    technologies: ["HTML", "", "REACT"]
}

const [board = "FOO", respect = "BOO", heart = "DOO"] = course.technologies

if(!board){
    alert("HEY")
}

// Какую переменную следует указать вместо XXX, что бы была вызвана функция alert?