const {searchQuery,filter,page=1,pageSize=20}=params;

const skipAmount=(page-1)*pageSize;

let sortOption={}

.skip(skipAmount)

.limit(pageSize)


const totalQuestions=await Question.countDocuments(query);

const isNext=totalQuestions>skipAmount+questions.length;
return {questions,isNext}
