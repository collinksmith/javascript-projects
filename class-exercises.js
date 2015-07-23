function Student(fname, lname) {
  this.fname = fname;
  this.lname = lname;
  this.courses = [];
}

function Course(cname, department, credits, days, time_block){
  this.cname = cname;
  this.department = department;
  this.credits = credits;
  this.students = [];
  this.days = days;
  this.time_block = time_block;
}

Student.prototype.name = function () {
  return this.fname + " " + this.lname;
}

Student.prototype.enroll = function (course) {
  if ( this.courses.indexOf(course) < 0) {
    this.courses.push(course);
    course.add_student(this);
  }
}

Student.prototype.course_load = function () {
  result = {};
  this.courses.forEach(function (course) {
    if (result[course.department]) {
      result[course.department] += course.credits;
    } else{
      result[course.department] = course.credits;
    }
  })
  return result;
}

Course.prototype.add_student = function (student) {
  if ( this.students.indexOf(student) < 0 ) {
    this.students.push(student)
    student.enroll(this)
  }
};


studenta = new Student("Buck", "Shlegeris")
studentb = new Student("Joe", "Johnson")

coursea = new Course("Gen Chem", "Chemistry", 4, ['mon', 'wed', 'fri'], 2)
courseb = new Course("Evolution", "Biology", 4, ['tue', 'thurs', 2])
coursec = new Course("Rock Climbing", "PE", 2, ['mon', 'wed'], 2)
coursed = new Course("O. Chem", "Chemistry", 9, ['mon', 'wed', 'fri', 4])

studenta.enroll(coursea)
studenta.enroll(courseb)
studentb.enroll(coursec)
studenta.enroll(coursed)
