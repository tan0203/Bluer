const Users = require("../models/userModel");
const Posts = require("../models/postModel");
const Advertisiments = require("../models/advertisimentModel");
const bcrypt = require("bcrypt");
const commentModel = require("../models/commentModel");

const responseCtrl = {
    getData: async (req, res, next) => {
        try {
            const users = await Users.find({});
            res.status(200).json(users);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getDataUser: async (req, res, next) => {
        try {
            const user = await Users.findOne({ _id: req.params.id });
            res.status(200).json(user);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getAdvertisiment: async (req, res, next) => {
        try {
            const advertisiment = await Advertisiments.find({});
            res.status(200).json(advertisiment);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getOneAdvertisiment: async (req, res, next) => {
        try {
            const ads = await Advertisiments.findOne({ _id: req.params.id });
            res.status(200).json(ads);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    createAdvertisiment: async (req, res) => {
        try {
            console.log(req.body);
            const { image, content, detail, link } = req.body;
            if (
                image?.length === 0
                // ||
                // content?.length === 0 ||
                // link?.length === 0 ||
                // detail?.length === 0
            )
                return res
                    .status(400)
                    .json({ msg: "This image already exists." });

            const newAdvertisiment = new Advertisiments({
                image,
                content,
                detail,
                link,
                createMonth: new Date().getMonth() + 1,
            });

            await newAdvertisiment.save();

            res.json({
                msg: "Advertisiment Create Success!",
                advertisiment: {
                    ...newAdvertisiment._doc,
                },
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    createPost: async (req, res) => {
        try {
            const { image, content, id } = req.body;
            if (image?.length === 0)
                return res
                    .status(400)
                    .json({ msg: "This image already exists." });
            if (content?.length === 0)
                return res
                    .status(400)
                    .json({ msg: "This content already exists." });
            if (id?.length === 0)
                return res.status(400).json({ msg: "This id already exists." });

            const newPost = new Posts({
                user: id,
                images:image,
                content,
                createMonth: new Date().getMonth() + 1,
            });

            await newPost.save();

            res.json({
                msg: "Post Create Success!",
                advertisiment: {
                    ...newPost._doc,
                },
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    editDataUser: async (req, res, next) => {
        try {
            const idUser = req.params.id;
            const {
                fullname,
                email,
                mobile,
                address,
                occupation,
                gender,
                imgFile,
            } = req.body;
            const user = await Users.findOneAndUpdate(
                { _id: idUser },
                {
                    fullname: fullname,
                    email: email,
                    mobile: mobile,
                    address: address,
                    gender: gender,
                    occupation: occupation,
                    avatar: imgFile,
                }
            );
            res.status(200).json(user);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    editPostUser: async (req, res, next) => {
        try {
            const idPost = req.params.id;
            const { content } = req.body;
            const post = await Posts.findOneAndUpdate(
                { _id: idPost },
                {
                    content: content,
                }
            );
            res.status(200).json(post);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    editAdvertisiment: async (req, res, next) => {
        try {
            const idPost = req.params.id;
            const { content, image, detail, link } = req.body;
            const post = await Advertisiments.findOneAndUpdate(
                { _id: idPost },
                {
                    content: content,
                    image: image,
                    detail: detail,
                    link: link,
                }
            );
            res.status(200).json(post);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteDataUser: async (req, res, next) => {
        try {
            const idUser = req.params.id;
            await Users.findOneAndDelete({ _id: idUser })
                .then(res.status(200).json({ msg: "success" }))
                .catch(err => console.log(err));
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    deletePost: async (req, res, next) => {
        try {
            const idPost = req.params.id;
            await Posts.findOneAndDelete({ _id: idPost })
                .then(res.status(200).json({ msg: "success" }))
                .catch(err => console.log(err));
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    deleteAdvertisiment: async (req, res, next) => {
        try {
            const idPost = req.params.id;
            await Advertisiments.findOneAndDelete({ _id: idPost })
                .then(res.status(200).json({ msg: "success" }))
                .catch(err => console.log(err));
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    register: async (req, res) => {
        try {
            const { fullname, username, email, password, gender } = req.body;
            let newUserName = username.toLowerCase().replace(/ /g, "");

            const user_name = await Users.findOne({ username: newUserName });
            if (user_name)
                return res
                    .status(400)
                    .json({ msg: "This user name already exists." });

            const user_email = await Users.findOne({ email });
            if (user_email)
                return res
                    .status(400)
                    .json({ msg: "This email already exists." });

            if (password.length < 6)
                return res
                    .status(400)
                    .json({ msg: "Password must be at least 6 characters." });

            const passwordHash = await bcrypt.hash(password, 12);
            const newUser = new Users({
                fullname,
                username: newUserName,
                email: email,
                password: passwordHash,
                gender: gender,
                createMonth: new Date().getMonth() + 1,
            });

            await newUser.save();

            res.json({
                msg: "Register Success!",
                user: {
                    ...newUser,
                    password: "",
                },
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = responseCtrl;
