LICENSE_RISK = {
    "MIT": 0,
    "Apache-2.0": 0,
    "BSD": 0,
    "GPL": 20,
    "GPL-3.0": 20,
    "LGPL": 10,
    "Unknown": 15
}


def check_licenses(dependencies):
    issues = []

    for dep in dependencies:
        license_name = dep.get("license", "Unknown")

        if LICENSE_RISK.get(license_name, 0) > 0:
            issues.append({
                "library": dep.get("library"),
                "license": license_name,
                "penalty": LICENSE_RISK[license_name]
            })

    return issues