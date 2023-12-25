const UserModel = require("./../../models/User.model") // new

exports.index = async (req, res) => {
    // destructure page and limit and set default values
    const page = req.query.page || 1;
    const page_size = req.query.page_size  || 10;

    try {
        // execute query with page and limit values
        const users = await UserModel.find()
            .limit(page_size)
            .skip((page - 1) * page_size)
            .exec();

        // get total documents in the Posts collection
        const count = await UserModel.count();

        // return response with posts, total pages, and current page
        const meta = {
            total_page: Math.ceil(count / page_size),
            total: count,
            current_page: parseInt(page),
            page_size: parseInt(page_size)
        }
        const status =  200;
        const data = {
            users: users
        }
        res.json({
            data,
            meta,
            status
        });
    } catch (err) {
        console.error(err.message);
    }
};
