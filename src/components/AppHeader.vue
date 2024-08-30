<script>
export default{
    data(){
        return{};

    }
}
</script>

<template>
     <nav class="navbar sticky-top navbar-expand-lg">
                    <div class="container-fluid">
                        
                            <div class="col">
                               <a class="navbar-brand" href="#">Your Travel Planner</a>
                            </div>
                            <div class="col d-flex justify-content-end">
                                <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"
                                    aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>

                                </button> 
                                <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar"
                                aria-labelledby="offcanvasNavbarLabel">
                                    <div class="offcanvas-header">
                                        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas"
                                            aria-label="Close"></button>
                                    </div>
                                    <div class="offcanvas-body">
                                        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                                            <li class="nav-item">
                                                <a class="nav-link active" aria-current="page" href="#">Dashboard</a>
                                            </li>
                                            
                                            <li class="nav-item">
                                                <a class="nav-link" href="#">Trips</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" href="#">Expenses</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" href="#">Reports</a>
                                            </li>
                                            <li class="nav-item dropdown">
                                                <a class="nav-link dropdown-toggle" href="#" role="button"
                                                    data-bs-toggle="dropdown" aria-expanded="false">
                                                    Your profile
                                                </a>
                                                <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" href="#">Settings</a></li>
                                                    <li><a class="dropdown-item" href="#">Logout</a></li>
                                                    <li>
                                                        <hr class="dropdown-divider">
                                                    </li>
                                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                        
                                    </div>

                                </div>
                            </div>
                       
                    </div>
                </nav>

</template>

<style lang="scss" scoped></style>