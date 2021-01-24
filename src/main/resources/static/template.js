// @ts-check

/**
 * @param {string} id 
 * @returns {Node}
 */
export function getTemplate(id) {
    /** @type HTMLTemplateElement */
    const template = document.querySelector(`template#${id}-template`);
    return template.content.cloneNode(true);
}