import { Container } from "@mui/material";
import styles from './body.module.css';
import Navbar from "../Navbar/Navbar.jsx";
import DialogSupport from "../DialogSupport/DialogSupport.jsx";
import Devs from "../Devs/Devs.jsx";

export default function Body() {
    return (
        <>
            <DialogSupport />
            <Navbar />
            <Container className={styles.container} id={"home"}>
                <div className={styles.body}>
                    <h1>Üdvözlet! A St®eak futárszolgálatnál!</h1>
                    <div className={styles.desc}>
                        <h2>
                            Ugorj fejest a vásárlás új korszákába!
                            <br/>
                            Itt nálunk a Streaknél!
                        </h2>
                        <h3>Kezd meg a regisztrációt!</h3>
                    </div>
                </div>
            </Container>

            <Container className={styles.container} id={"work"}>
                <div className={styles.body}>
                    <h1>Dolgozz velünk!</h1>
                    <div className={styles.desc2}>
                        <h2>
                            <strong>Munkát keresel?</strong>
                            <br/>
                            Lehetsz cégünk futárja vagy akár a honlap kezelője!
                        </h2>
                        <p>Nem kell nagy tehetség elég csak egy autó vagy bicikli</p>
                        <p>Rahuppansz és kész is</p>
                        <h3>Mit kínálunk:</h3>
                        <ul>
                            <li>Remek fizetés</li>
                            <li>Jó közösség</li>
                            <li>Gördülékeny munka idő</li>
                            <li>Még akár diákként is jöhetsz</li>
                        </ul>
                        <p>Ezek mellett még külön akciók várnak rád!</p>
                    </div>
                </div>
            </Container>

            <Container className={styles.container} id={"about"}>
                <div className={styles.body}>
                    <h1>Mit kell tudni a St®eak-ről</h1>
                    <div className={styles.desc2}></div>
                    <p>
                        A St®eak egy ételfutárszolglat, mely könnyen tud munkaerőt <strong>NEKED</strong> vagy <strong>ISMERŐSÖDNEK</strong> biztosítani.
                        <br/>
                        Nem csak éttermeknek kináljuk szolgáltatásunkat hanem bolt tulajdonosoknak is!
                        <br/>
                    </p>
                    <br/>
                    <p>Vagy esetleg ha simán vásárolnál magadnak vagy rendelnél valami finomat <br/> főleg <strong>NEKED</strong> ajánljuk a St®eak-et</p>
                    <div className={styles.desc2}>
                        <h1>Fejlesztők</h1>
                        <Devs />
                        <h2>Elkezded a sorozatot?</h2>
                    </div>
                </div>
            </Container>
        </>
    );
}
