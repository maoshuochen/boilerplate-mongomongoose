const { default: mongoose } = require("mongoose");
require("dotenv").config();

//3-1 安装和设置 Mongoose
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//3-2 创建一个模型（Model）
const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFoods: [String],
});

let Person = mongoose.model("Person", personSchema);

//3-3 创建并保存一条 Model 记录
function createAndSavePerson(done) {
    const person = new Person({
        name: "Jack",
        age: 24,
        favoriteFoods: ["apple", "banana"],
    });
    person.save(function (err, data) {
        if (err) done(err);
        else done(null, data);
    });
}

//3-4 使用 model.create() 创建多条记录
const createManyPeople = (arrayOfPeople, done) => {
    console.log(arrayOfPeople);
    Person.create(arrayOfPeople, function (err, data) {
        if (err) done(err);
        else done(null, data);
    });
};

//3-5 使用 model.find() 查询数据库
const findPeopleByName = (personName, done) => {
    Person.find({ name: personName }, function (err, data) {
        if (err) done(err);
        else done(null, data);
    });
};

//3-6 使用 model.findOne() 从数据库中返回一个单一匹配的 Document
const findOneByFood = (food, done) => {
    Person.findOne({ food: food }, function (err, data) {
        if (err) done(err);
        else done(null, data);
    });
};

//3-7 使用 model.findById() 方法，根据 _id 来搜索数据
const findPersonById = (personId, done) => {
    Person.findById(personId, function (err, data) {
        if (err) done(err);
        else done(null, data);
    });
};

const findEditThenSave = (personId, done) => {
    const foodToAdd = "hamburger";

    done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
    const ageToSet = 20;

    done(null /*, data*/);
};

const removeById = (personId, done) => {
    done(null /*, data*/);
};

const removeManyPeople = (done) => {
    const nameToRemove = "Mary";

    done(null /*, data*/);
};

const queryChain = (done) => {
    const foodToSearch = "burrito";

    done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
