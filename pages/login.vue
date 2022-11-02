<template>
  <div class="flex justify-center content-center">
    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div class="card-body">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Cytoid ID</span>
          </label>
          <input type="text" placeholder="Cytoid ID" class="input input-bordered" />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <input type="text" placeholder="Password" class="input input-bordered" />
          <label class="label">
            <a href="#" class="label-text-alt link link-hover">Need help?</a>
          </label>
        </div>
        <div class="form-control mt-6">
          <button class="btn btn-primary">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>