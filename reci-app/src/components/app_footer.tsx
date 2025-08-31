const AppFooter = () => {
    const year = new Date().getFullYear();
    return <footer>
        <p>© {year} <span id="year"></span> Recipick. All rights reserved.</p>
    </footer>
}

export default AppFooter;