/******************** LABORATORIO III ****************************
 * 
 * Modifica la clase Extended (reescríbela) añadiéndole un método match estático.
 * El métoddo debe recuperar el objeto teacher, objeto student y, opcionalmente,
 * el nombre del curso.  Tu tarea es encontrar la correspondencia entre el
 * estudiante y el profesor.
 * 
 * En caso de que no se proporcione el nombre del curso, el método debe devolver:
 * 
 *    + Una matriz vacía si no hay coincidencias (el profesor no imparte cursos en los
 *      que está interesado el estudiante o imparte cursos de un nivel inferior)
 *    + Una matriz con objetos {course, level}, si el profesor enseña los cursos que le
 *      interesan al estudiante.
 * 
 * Si el nombre del curso se pasa como último argumento, entonces el método debe devolver
 * el objeto {course, level} en caso de una coincidencia correcta o undefined en caso contrario.
*/ 
class Student {
    constructor({ name, surname, email }) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.courses = [];
    }

    addCourse(course, level) {
        this.courses.push({ course, level });
    }

    getCourses() {
        return this.courses;
    }
}

class Teacher {
    constructor({ name, surname, email }) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.courses = [];
    }

    addCourse(course, level) {
        this.courses.push({ course, level });
    }

    editCourse(courseName, newLevel) {
        const course = this.courses.find(c => c.course === courseName);
        if (course) {
            course.level = newLevel;
        }
    }

    getCourses() {
        return this.courses;
    }
}

class ExtendedUser {
  static match(teacher, student, courseName) {
      const studentCourses = student.getCourses(); // Suponiendo que getCourses devuelve un array de {course, level}
      const teacherCourses = teacher.getCourses(); // Igualmente, se asume que getCourses existe en Teacher
      
      if (courseName) {
          // Buscar coincidencia específica
          const studentCourse = studentCourses.find(c => c.course === courseName);
          const teacherCourse = teacherCourses.find(c => c.course === courseName);
          
          if (studentCourse && teacherCourse && teacherCourse.level >= studentCourse.level) {
              return { course: courseName, level: studentCourse.level };
          } else {
              return undefined;
          }
      } else {
          // Buscar todas las coincidencias
          const matches = [];
          
          studentCourses.forEach(studentCourse => {
              const teacherCourse = teacherCourses.find(c => c.course === studentCourse.course);
              
              if (teacherCourse && teacherCourse.level >= studentCourse.level) {
                  matches.push({ course: studentCourse.course, level: studentCourse.level });
              }
          });
          
          return matches;
      }
  }
}

/** 
 * Pruebe su solución utilizando el siguiente código:
 * 
 * 
 */
let student1 = new Student({name: 'Rafael', surname: 'Fife', email: 'rfife@rhyta.com'});
let student2 = new Student({name: 'Kelly', surname: 'Estes', email: 'k_estes@dayrep.com'});
let teacher1 = new Teacher({name: 'Paula', surname: 'Thompkins', email: 'PaulaThompkins@jourrapide.com'});

student1.addCourse('maths', 2);
student1.addCourse('physics', 4);
teacher1.addCourse('maths', 4);
let match = ExtendedUser.match(teacher1, student1);
console.log(match); // -> [{course: 'maths', level: 2}]
teacher1.editCourse('maths', 1);
match = ExtendedUser.match(teacher1, student1);
console.log(match); // -> []
teacher1.addCourse('physics', 4);
match = ExtendedUser.match(teacher1, student1, 'physics');
console.log(match); // -> {course: 'physics', level: 4}