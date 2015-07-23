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
  if (this.has_conflict(course)){
    console.log("Cannot enroll, there is a clash");
  } else {
    this.courses.push(course);
    course.students.push(this);
  }
}

Student.prototype.has_conflict = function (course) {
  var is_true = false;
  this.courses.forEach ( function (this_course) {
    if (this_course.conflictsWith(course)){
      is_true = true;
    }
  })
  return is_true;
};

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
  this.students.push(student)
  student.courses.push(this)
  }

Course.prototype.conflictsWith = function (course) {
  if (!(this.time_block === course.time_block)){
    return false;
  }else {
    var days_this = this.days
    var is_true = false
    course.days.forEach( function (day) {
      if (days_this.indexOf(day) > 0){
        is_true =  true;
      }
    })
    return is_true;
  }
};


studenta = new Student("Buck", "Shlegeris")
studentb = new Student("Joe", "Johnson")

coursea = new Course("Gen Chem", "Chemistry", 4, ['mon', 'wed', 'fri'], 2)
courseb = new Course("Evolution", "Biology", 4, ['tue', 'thurs'], 2)
coursec = new Course("Rock Climbing", "PE", 2, ['mon', 'wed'], 2)
coursed = new Course("O. Chem", "Chemistry", 9, ['mon', 'wed', 'fri'], 4)

studenta.enroll(coursea)
studenta.enroll(courseb)
studentb.enroll(coursec)
studenta.enroll(coursed)
