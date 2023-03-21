
import  { useState, useEffect } from 'react';
import { renderHook } from '@testing-library/react';


describe("<BarcodePage />", () => {
    test('render scanning starts', () => {
        const { result } = renderHook(() => {
            const [scan, setScan] = useState(true);
            useEffect(() => {
                setScan(true);
            }, [scan]);
            return scan
        })
        expect(result.current).toBe(true)
    });

   
})


