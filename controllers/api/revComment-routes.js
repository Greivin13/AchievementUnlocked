const router = require('express').Router();
const { revComment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    revComment.findAll()
    .then(revCommentData => res.json(revCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
    revComment.create({
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
        post_id: req.body.post_id
    })
    .then(revCommentData => res.json(revCommentData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
    revComment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(revCommentData => {
        if (!revCommentData) {
            res.status(404).json({ message: 'No comment found containing this id' });
            return;
        }
        res.json(revCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
       });
    });

    module.exports = router;
