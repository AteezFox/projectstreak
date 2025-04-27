import Drawer from '@mui/material/Drawer'
import { useState, useEffect, useContext } from 'react'
import { Button, Box, List, ListItem, ListItemText, Typography } from '@mui/material'
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar'
import FilterListIcon from '@mui/icons-material/FilterList'
import Container from '@mui/material/Container'
import styles from './companyside.module.css'
import { AppContext } from '../../../../Context/AppContext'
import axios from 'axios'

export default function CompanySide() {
    const [isSideOpen, setIsSideOpen] = useState(false);
    const [categories, setCategories] = useState(['all']);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [allProducts, setAllProducts] = useState([]);
    const { setFilteredProducts } = useContext(AppContext);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios.get('http://localhost:8080/streak/api/products/get/8/1')
            .then(response => {
                setAllProducts(response.data);
                // Extract unique categories from products
                const uniqueCategories = [...new Set(response.data.map(product => product.category))];
                setCategories(['all', ...uniqueCategories.filter(category => category)]);
            })
            .catch(error => {
                console.error('Hiba történt a termékek betöltésekor:', error);
            });
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        const filteredProducts = category === 'all' 
            ? allProducts 
            : allProducts.filter(product => product.category === category);
        setFilteredProducts(filteredProducts);
    };

    const toggleSide = () => {
        setIsSideOpen(!isSideOpen);
    };

    return (
        <>
            <Button 
                variant="contained" 
                className={styles.floatingButton} 
                onClick={toggleSide}
                title="Szűrők megnyitása"
            >
                <FilterListIcon />
            </Button>
            <Drawer 
                variant="temporary" 
                anchor="left" 
                open={isSideOpen} 
                onClose={toggleSide}
                className={styles.drawer}
                            >
                <Container className={styles.container}>
                    <Box className={styles.body}>
                        <Typography className={styles.categoryTitle}>
                            <FilterListIcon />
                            Termék Kategóriák
                        </Typography>
                        <List className={styles.categoryList}>
                            {categories.map((category) => (
                                <ListItem
                                    key={category}
                                    onClick={() => handleCategorySelect(category)}
                                    className={`${styles.categoryItem} ${
                                        selectedCategory === category ? styles.active : ''
                                    }`}
                                >
                                    <ListItemText
                                        primary={category === 'all' 
                                            ? 'Összes termék' 
                                            : category.charAt(0).toUpperCase() + category.slice(1)}
                                        className={styles.categoryText}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Container>
            </Drawer>
        </>
    );
}