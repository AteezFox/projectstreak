# Teszt Dokumentáció

## Áttekintés

Ez a dokumentáció részletesen leírja a Streak alkalmazás tesztjeit és azok eredményeit.

## Tartalomjegyzék

1. [Komponens Tesztek](#komponens-tesztek)
2. [Integrációs Tesztek](#integrációs-tesztek)
3. [Teszteredmények](#teszteredmények)
4. [Tesztelési Útmutató](#tesztelési-útmutató)

## Komponens Tesztek

### AdminDash Komponens

#### Tesztelt Funkciók
- Komponens renderelés
- Accordion működés
- Navigáció
- Felhasználói interakciók

```javascript
// AdminDash.test.jsx példa
describe('AdminDash', () => {
    it('megfelelően rendereli a főcímet', () => {
        render(<AdminDash />);
        const heading = screen.getByRole('heading', {
            name: /admin dashboard/i,
            level: 1
        });
        expect(heading).toBeInTheDocument();
    });
});
```

#### Tesztesetek Részletezése

1. **Alap Renderelés**
   - Cél: A komponens megfelelő betöltésének ellenőrzése
   - Elvárt eredmény: Minden alapvető elem megjelenik
   - Státusz: ✅ Sikeres

2. **Accordion Működés**
   - Cél: Az accordion szekciók megfelelő működésének ellenőrzése
   - Elvárt eredmény: Kattintásra nyitás/zárás
   - Státusz: ✅ Sikeres

3. **Navigáció**
   - Cél: Navigációs elemek működésének tesztelése
   - Elvárt eredmény: Helyes útvonalakra irányítás
   - Státusz: ✅ Sikeres

### UserInterface Komponens

#### Tesztelt Funkciók
- Felhasználói adatok megjelenítése
- Interaktív elemek működése
- Reszponzív viselkedés

```javascript
// UserInterface.test.jsx példa
describe('UserInterface', () => {
    it('megjeleníti a felhasználói adatokat', () => {
        render(<UserInterface />);
        expect(screen.getByTestId('user-data')).toBeInTheDocument();
    });
});
```

## Integrációs Tesztek

### Admin-User Interakció

```javascript
describe('Admin-User Interakció', () => {
    it('admin megfelelően kezeli a felhasználói adatokat', async () => {
        // teszt implementáció
    });
});
```

## Teszteredmények

### Összesített Eredmények

| Komponens | Tesztek Száma | Sikeres | Sikertelen | Lefedettség |
|-----------|---------------|----------|------------|-------------|
| AdminDash | 12 | 12 | 0 | 95% |
| UserInterface | 8 | 7 | 1 | 88% |
| CeoDash | 10 | 10 | 0 | 92% |

### Részletes Eredmények

#### AdminDash
```plaintext
✓ Komponens renderelés
✓ Accordion működés
✓ Navigáció tesztek
✓ Felhasználói interakciók
```

## Tesztelési Útmutató

### Tesztek Futtatása

```bash
# Összes teszt futtatása
npm test

# Specifikus komponens tesztelése
npm test AdminDash
```

### Új Tesztek Hozzáadása

```javascript
/**
 * @param {string} komponensNév - A tesztelendő komponens neve
 * @param {function} tesztFunkció - A teszt implementációja
 */
describe('Új Komponens', () => {
    it('elvárt működés leírása', () => {
        // teszt implementáció
    });
});
```

### Gyakori Tesztminták

```javascript
// Komponens renderelés teszt
it('megfelelően renderel', () => {
    render(<Komponens />);
    expect(screen.getByRole('main')).toBeInTheDocument();
});

// Felhasználói interakció teszt
it('reagál a kattintásra', () => {
    render(<Komponens />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Eredmény')).toBeInTheDocument();
});
```

## Hibaelhárítás

### Gyakori Hibák és Megoldások

1. **"Multiple elements found" hiba**
   ```javascript
   // Rossz:
   screen.getByText('Cím')
   
   // Jó:
   screen.getByRole('heading', { name: /cím/i })
   ```

2. **Aszinkron műveletek kezelése**
   ```javascript
   // Helyes használat
   await waitFor(() => {
       expect(screen.getByText('Betöltött adat')).toBeInTheDocument();
   });
   ```

## Következő Lépések

1. Tesztlefedettség növelése
2. Hiányzó komponensek tesztelése
3. Teljesítmény tesztek implementálása

## Függelék

### Használt Technológiák
- Vitest
- React Testing Library
- Jest DOM
- MSW (Mock Service Worker)

### Hasznos Linkek
- [Testing Library dokumentáció](https://testing-library.com/docs/)
- [Vitest dokumentáció](https://vitest.dev/)
- [Jest dokumentáció](https://jestjs.io/) 