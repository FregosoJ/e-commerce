const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategoriesData = await Category.findAll({
      include: [{ model: Product }]
    })
    res.status(200).json(allCategoriesData)
  } catch (err) {
    res.status(500).json(err)
  }
});


router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    })
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  //  req.body will look like 
  //{ category_name: "STRING" }
  try {
    const category = await Category.create(req.body)
    res.status(200).json(category)
  } catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  // req.body will look like
  // { category_name }
  // req.params.id will find the category_name to update
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(updatedCategory)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {

    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!deletedCategory) {
      res.status(404).json({ message: "No category found with this id" })
    }

    res.status(200).json(deletedCategory)

  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;