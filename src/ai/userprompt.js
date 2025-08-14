export const userPrompt = ({ name, userQuery, products }) => `
Hola, soy ${name}. 

Analiza la siguiente información:

- Consulta del usuario: "${userQuery}"
- Catálogo de productos disponibles: ${JSON.stringify(products)}

Tareas:

1. Si el usuario pregunta por un producto específico, sugiere los productos más relevantes de la lista que coincidan con su búsqueda.
2. Si el usuario pregunta "¿qué productos tienes?", muestra todos los productos del catálogo de manera organizada y clara.
3. Para cada producto sugerido, genera una breve descripción atractiva y persuasiva que resalte sus características, beneficios y cualquier detalle relevante para motivar la compra.
4. Mantén un tono profesional, amable y cercano, y enfócate en ayudar al usuario a encontrar la mejor opción según sus necesidades y estilo.
Respuesta final: Devuelve las recomendaciones de productos con sus descripciones, de forma clara y fácil de leer.
`;
