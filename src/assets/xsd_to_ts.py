import xml.etree.ElementTree as ET
import sys

# ===== CONFIGURATION =====
BUILTIN_TYPES = {
    'xsd:string': 'string',
    'xsd:decimal': 'number',
    'xsd:date': 'string',
    'xsd:boolean': 'boolean',
    'xsd:int': 'number',
    'xsd:integer': 'number',
    'xsd:float': 'number',
    'xsd:double': 'number',
    'xsd:long': 'number',
    'xsd:short': 'number',
    'xsd:byte': 'number',
    'xsd:unsignedInt': 'number',
    'xsd:unsignedShort': 'number',
    'xsd:unsignedByte': 'number',
    'xsd:dateTime': 'string',
}

# ===== TYPE CONVERSION =====
def convert_type(xsd_type: str) -> str:
    if xsd_type in BUILTIN_TYPES:
        return BUILTIN_TYPES[xsd_type]
    if ':' in xsd_type:
        prefix, name = xsd_type.split(':', 1)
        return f'_{prefix}_{name}'
    return xsd_type  # fallback

# ===== MAIN LOGIC =====
def generate_interfaces(xsd_file: str) -> str:
    tree = ET.parse(xsd_file)
    root = tree.getroot()
    ns = {'xsd': 'http://www.w3.org/2001/XMLSchema'}

    lines = ["// Auto-generated from XSD\n"]

    for complex_type in root.findall('xsd:complexType', ns):
        type_name = complex_type.attrib.get('name')
        sequence = complex_type.find('xsd:sequence', ns)
        if not type_name or sequence is None:
            continue

        lines.append(f"export interface {type_name} {{")
        for element in sequence.findall('xsd:element', ns):
            name = element.attrib.get('name')
            xsd_type = element.attrib.get('type', 'xsd:string')
            min_occurs = element.attrib.get('minOccurs', '1')
            max_occurs = element.attrib.get('maxOccurs', '1')

            optional = min_occurs == '0'
            is_array = max_occurs == 'unbounded'

            ts_type = convert_type(xsd_type)
            if is_array:
                ts_type += '[]'

            lines.append(f"  {name}{'?' if optional else ''}: {ts_type};")
        lines.append("}\n")

    return '\n'.join(lines)

# ===== CLI ENTRYPOINT =====
if __name__ == "__main__":
    print("Started...")
    if len(sys.argv) < 2:
        print("Usage: python xsd_to_ts.py <xsd_file>")
        sys.exit(1)

    xsd_path = sys.argv[1]
    ts_output = generate_interfaces(xsd_path)
    print(ts_output)
