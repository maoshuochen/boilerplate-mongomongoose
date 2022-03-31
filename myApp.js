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
        if (err) console.log(err);
        else done(null, data);
    });
}

//3-4 使用 model.create() 创建多条记录
const createManyPeople = (arrayOfPeople, done) => {
    console.log(arrayOfPeople);
    Person.create(arrayOfPeople, function (err, data) {
        if (err) console.log(err);
        else done(null, data);
    });
};

//3-5 使用 model.find() 查询数据库
const findPeopleByName = (personName, done) => {
    Person.find({ name: personName }, function (err, data) {
        if (err) console.log(err);
        else done(null, data);
    });
};

//3-6 使用 model.findOne() 从数据库中返回一个单一匹配的 Document
const findOneByFood = (food, done) => {
    Person.findOne({ food: food }, function (err, data) {
        if (err) console.log(err);
        else done(null, data);
    });
};

//3-7 使用 model.findById() 方法，根据 _id 来搜索数据
const findPersonById = (personId, done) => {
    Person.findById(personId, function (err, data) {
        if (err) console.log(err);
        else done(null, data);
    });
};

//3-8 通过执行查询、编辑、保存来执行经典更新流程
const findEditThenSave = (personId, done) => {
    const foodToAdd = "hamburger";
    Person.findById(personId, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            data.favoriteFoods.push(foodToAdd);
            data.save(function (err, data) {
                if (err) console.log(err);
                else done(null, data);
            });
        }
    });
};

//3-9 在 document 中执行新的更新方式——使用 model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
    const ageToSet = 20;
    Person.findOneAndUpdate(
        { name: personName },
        { age: 20 },
        { new: true },
        function (err, data) {
            if (err) console.log(err);
            else done(null, data);
        }
    );
};

//3-10 使用 model.findByIdAndRemove 删除一个 document
//removeById()已弃用，换为deleteOne()
const removeById = (personId, done) => {
    Person.deleteOne({ _id: personId }, function (err, data) {
        if (err) console.log(err);
        else done(null, data);
    });
};

//3-11 使用 model.remove() 删除多个 document
//remove()已弃用，换为deleteMany()
const removeManyPeople = (done) => {
    const nameToRemove = "Mary";
    Person.deleteMany(
        { name: nameToRemove },
        { new: true },
        function (err, data) {
            if (err) console.log(err);
            else {
                data.ok = true;
                data.n = data.deletedCount;
                done(null, data);
            }
        }
    );
};

//3-12 通过链式调用辅助查询函数来缩小搜索结果
const queryChain = (done) => {
    const foodToSearch = "burrito";
    //如果不给 Model.find()（或者别的搜索方法）的最后一个参数传入回调函数, 查询将不会执行。
    Person.find({ favoriteFoods: foodToSearch }) //As favouriteFoods is a simple array of strings, you can just query that field directly:
        .sort("name")
        .limit(2)
        .select("name favoriteFoods")
        .exec(
            //实际的数据库操作会在最后调用 .exec() 方法时执行。
            function (err, data) {
                if (err) console.log(err);
                else {
                    console.log(data);
                    done(null, data);
                }
            }
        );
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
