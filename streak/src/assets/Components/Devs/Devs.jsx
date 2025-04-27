import { Card, CardContent, Typography } from '@mui/material';
import styles from './devs.module.css';

const developers = [
    { name: "Gazdóf Ferenc", role: "Backend", image: "./images/feri.jpeg" },
    { name: "Gyurcsák Attila", role: "Frontend", image: "./images/attila.png" }
];

export default function DeveloperCards() {
    return (
        <div className={styles.cardContainer}>
            {developers.map((dev, index) => (
                <Card key={index} className={styles.card}>
                    <CardContent>
                        <img src={dev.image} alt={dev.name} className={styles.cardImage} />
                        <Typography variant="h5" component="div" className={styles.cardTitle}>
                            {dev.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {dev.role}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
