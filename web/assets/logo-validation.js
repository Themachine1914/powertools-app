// Script de validación para la integración del logo PowerTools RD

function validateLogoIntegration() {
    console.log('🔍 Validando integración del logo PowerTools RD...');
    
    const tests = [
        // Test 1: Logo en header
        {
            name: 'Logo en Header',
            test: () => document.querySelector('.logo-image') !== null,
            element: '.logo-image'
        },
        
        // Test 2: Fallback presente
        {
            name: 'Fallback del Logo',
            test: () => document.querySelector('.logo-fallback') !== null,
            element: '.logo-fallback'
        },
        
        // Test 3: Favicon
        {
            name: 'Favicon',
            test: () => document.querySelector('link[rel="icon"]') !== null,
            element: 'link[rel="icon"]'
        },
        
        // Test 4: Texto RD con estilo
        {
            name: 'Texto RD estilizado',
            test: () => document.querySelector('.logo-rd') !== null,
            element: '.logo-rd'
        },
        
        // Test 5: Variables CSS del logo
        {
            name: 'Variables CSS del Logo',
            test: () => {
                const root = getComputedStyle(document.documentElement);
                return root.getPropertyValue('--logo-shadow').trim() !== '';
            },
            element: ':root'
        }
    ];
    
    let passed = 0;
    let failed = 0;
    
    tests.forEach(test => {
        try {
            if (test.test()) {
                console.log(`✅ ${test.name}: OK`);
                passed++;
            } else {
                console.log(`❌ ${test.name}: FALLO - Elemento ${test.element} no encontrado`);
                failed++;
            }
        } catch (error) {
            console.log(`❌ ${test.name}: ERROR - ${error.message}`);
            failed++;
        }
    });
    
    console.log(`\n📊 Resultados de validación:`);
    console.log(`✅ Pasaron: ${passed}`);
    console.log(`❌ Fallaron: ${failed}`);
    console.log(`📈 Score: ${Math.round((passed / tests.length) * 100)}%`);
    
    if (failed === 0) {
        console.log('🎉 ¡Integración del logo completada exitosamente!');
    } else {
        console.log('⚠️  Algunos elementos necesitan atención.');
    }
    
    return { passed, failed, total: tests.length };
}

// Función para cargar logo de prueba si no existe el real
function loadTestLogo() {
    const logoImg = document.querySelector('.logo-image');
    if (logoImg) {
        logoImg.onerror = function() {
            console.log('📸 Logo principal no encontrado, usando fallback...');
            this.style.display = 'none';
            const fallback = this.nextElementSibling;
            if (fallback && fallback.classList.contains('logo-fallback')) {
                fallback.style.display = 'flex';
            }
        };
    }
}

// Función para probar la integración en PDFs
function testPDFLogo() {
    console.log('📄 Probando logo en PDF...');
    
    // Simular generación de PDF
    if (typeof generatePDF === 'function') {
        console.log('✅ Función generatePDF disponible');
    } else {
        console.log('❌ Función generatePDF no disponible');
    }
    
    // Verificar que la función createPDFContent use el logo
    if (typeof createPDFContent === 'function') {
        const testContent = createPDFContent('Test content');
        if (testContent.includes('powertools-logo.png')) {
            console.log('✅ PDF incluye referencia al logo');
        } else {
            console.log('❌ PDF no incluye referencia al logo');
        }
    }
}

// Ejecutar validación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    loadTestLogo();
    
    // Esperar un poco para que todo se cargue
    setTimeout(() => {
        validateLogoIntegration();
        testPDFLogo();
    }, 1000);
});

// Función manual para ejecutar desde consola
window.validatePowerToolsLogo = validateLogoIntegration;
