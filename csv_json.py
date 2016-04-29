import csv, ujson as json, pprint

pp = pprint.PrettyPrinter(indent=2)

def mapjson(course, uid, course_key = ['original_date','course_name','recommended_prerequisite','instructor','in_person_ta','webex_ta','course_length','description','topics_covered', 'additional_resources', 'register', 'software_needed']):
    course_entry = { key: value for (key, value) in zip(course_key, course) }
    course_entry['uid'] = uid
    return course_entry

course_json = []
with open('./Commerce Data Academy Courses - Academy_Courses_Reduced.csv', 'rt') as f:
    courses = csv.reader(f)
    for i, course in enumerate(courses):
        # if i == 0:
        #     course_key = course
        if i != 0:
            course_json.append(mapjson(course, i))

with open('cda_courses.json', 'wt') as f:
    json.dump({ 'data':course_json }, f)

