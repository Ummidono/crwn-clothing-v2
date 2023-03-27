import { Fragment, useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { Link } from "react-router-dom";

const CategoriesPreview = () => {
    const {categoriesMap} = useContext(CategoriesContext)
    return (
        <Fragment>
            {
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title];
                    return <Link className='title' to={title}><CategoryPreview key={title} title={title} products={products}/></Link>
                }
            )}
        </Fragment>
    );
};

export default CategoriesPreview;