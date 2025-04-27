import { List, ListItem, ListItemText } from '@mui/material'
import styles from './companyside.module.css'

export default function CategoryList({ categories, selectedCategory, onCategorySelect }) {
    const formatCategoryName = (category) => {
        return category === 'all' 
            ? 'Összes termék' 
            : category.charAt(0).toUpperCase() + category.slice(1);
    };

    return (
        <List className={styles.categoryList}>
            {categories.map((category) => (
                <ListItem
                    key={category}
                    onClick={() => onCategorySelect(category)}
                    className={`${styles.categoryList} ${
                        selectedCategory === category ? styles.active : ''
                    }`}
                >
                    <ListItemText
                        primary={formatCategoryName(category)}
                        className={styles.categoryText}
                    />
                </ListItem>
            ))}
        </List>
    );
}