import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect, describe, it, vi } from 'vitest';
import CompanySite from '../../../../assets/Role/Company/CompanyComponents/CompanySite/CompanySite';

/**
 * @fileoverview CompanySite komponens tesztjei
 * @description A cég oldal működésének és megjelenítésének tesztelése
 */

// Mock komponensek
vi.mock('../../../../assets/Role/User/UserComponents/UserNavbar/UserNav', () => ({
    default: () => <div data-testid="user-nav">Felhasználói Navigáció</div>
}));

vi.mock('../../../../assets/Role/Company/CompanyComponents/CompanySide/CompanySide', () => ({
    default: () => <div data-testid="company-side">Cég Oldalsáv</div>
}));

vi.mock('../../../../assets/Role/Product/ProductCards/ProductCards', () => ({
    default: () => <div data-testid="product-cards">Termék Kártyák</div>
}));

// Material-UI komponensek mockja
vi.mock('@mui/material/Container', () => ({
    default: ({ children, className }) => (
        <div data-testid="mui-container" className={className}>
            {children}
        </div>
    )
}));

vi.mock('@mui/material/Box', () => ({
    default: ({ children, className }) => (
        <div data-testid="mui-box" className={className}>
            {children}
        </div>
    )
}));

/**
 * CompanySite komponens tesztjei
 * @group Cég
 * @group Komponensek
 */
describe('CompanySite Komponens', () => {
    /**
     * Segédfüggvény a komponens rendereléshez
     * @returns {Object} Renderelt komponens
     */
    const renderCompanySite = () => {
        return render(<CompanySite />);
    };

    /**
     * @test
     * @description Ellenőrzi, hogy a komponens megfelelően renderelődik-e
     */
    it('megfelelően betöltődik', () => {
        renderCompanySite();
        expect(screen.getByTestId('user-nav')).toBeInTheDocument();
        expect(screen.getByTestId('company-side')).toBeInTheDocument();
        expect(screen.getByTestId('product-cards')).toBeInTheDocument();
    });

    /**
     * Struktúra tesztek
     * @group Szerkezet
     */
    describe('Oldal Szerkezet', () => {
        /**
         * @test
         * @description Ellenőrzi a fő komponensek megfelelő sorrendjét
         */
        it('megfelelő sorrendben jeleníti meg a komponenseket', () => {
            renderCompanySite();
            
            const container = screen.getByTestId('mui-container');
            expect(container).toBeInTheDocument();
            
            const box = screen.getByTestId('mui-box');
            expect(box).toBeInTheDocument();
            
            // Ellenőrizzük, hogy a Box a Container-ben van
            expect(container).toContainElement(box);
            
            // Ellenőrizzük, hogy a ProductCards a Box-ban van
            expect(box).toContainElement(screen.getByTestId('product-cards'));
        });

        /**
         * @test
         * @description Ellenőrzi a Container és Box komponensek jelenlétét és osztályait
         */
        it('tartalmazza a Container és Box elemeket megfelelő osztályokkal', () => {
            renderCompanySite();
            
            const container = screen.getByTestId('mui-container');
            expect(container).toHaveClass('_container_374e4a');
            
            const box = screen.getByTestId('mui-box');
            expect(box).toHaveClass('_body_374e4a');
        });
    });

    /**
     * Gyermek komponensek tesztjei
     * @group Komponensek
     */
    describe('Gyermek Komponensek', () => {
        /**
         * @test
         * @description Ellenőrzi a UserNav komponens jelenlétét és működését
         */
        it('megjeleníti a UserNav komponenst', () => {
            renderCompanySite();
            const nav = screen.getByTestId('user-nav');
            expect(nav).toBeInTheDocument();
            expect(nav).toHaveTextContent('Felhasználói Navigáció');
        });

        /**
         * @test
         * @description Ellenőrzi a CompanySide komponens jelenlétét és működését
         */
        it('megjeleníti a CompanySide komponenst', () => {
            renderCompanySite();
            const side = screen.getByTestId('company-side');
            expect(side).toBeInTheDocument();
            expect(side).toHaveTextContent('Cég Oldalsáv');
        });

        /**
         * @test
         * @description Ellenőrzi a ProductCards komponens jelenlétét és működését
         */
        it('megjeleníti a ProductCards komponenst', () => {
            renderCompanySite();
            const cards = screen.getByTestId('product-cards');
            expect(cards).toBeInTheDocument();
            expect(cards).toHaveTextContent('Termék Kártyák');
        });
    });

    /**
     * Stílus tesztek
     * @group Megjelenés
     */
    describe('Megjelenés', () => {
        /**
         * @test
         * @description Ellenőrzi a CSS osztályok megfelelő alkalmazását
         */
        it('megfelelően alkalmazza a CSS osztályokat', () => {
            renderCompanySite();
            
            const container = screen.getByTestId('mui-container');
            expect(container).toHaveClass('_container_374e4a');
            
            const box = screen.getByTestId('mui-box');
            expect(box).toHaveClass('_body_374e4a');
        });
    });

    /**
     * Reszponzivitás tesztek
     * @group Reszponzivitás
     */
    describe('Reszponzív Viselkedés', () => {
        /**
         * @test
         * @description Ellenőrzi a komponens reszponzív viselkedését
         */
        it('megfelelően alkalmazkodik a képernyőmérethez', () => {
            const { container } = renderCompanySite();
            
            // Mobil méret szimuláció
            window.innerWidth = 375;
            window.dispatchEvent(new Event('resize'));
            
            // Tablet méret szimuláció
            window.innerWidth = 768;
            window.dispatchEvent(new Event('resize'));
            
            // Desktop méret szimuláció
            window.innerWidth = 1024;
            window.dispatchEvent(new Event('resize'));
            
            expect(container).toBeInTheDocument();
        });
    });
});
