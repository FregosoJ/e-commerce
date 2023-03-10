const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // including its associated Product data
  try {
    const allTagsData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: "tagged_products" }]
    })
    res.status(200).json(allTagsData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // including its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: "tagged_products" }]
    })
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  // req.body should look like
  // { tag_name: "STRING" }
  try {
    const newTag = await Tag.create(req.body)
    res.status(200).json(newTag)
  } catch (err) {
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  // req.body will be { tag_name: "STRING" }
  // req.params.id will be the tag_name to update
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(updatedTag)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })

    if (!deletedTag) {
      res.status(404).json({ message: "No tag found with this id" })
    }

    res.status(200).json(deletedTag)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;