@if ($paginator->hasPages())
<nav class="join">
    @if ($paginator->onFirstPage())
        <span class="join-item btn btn-disabled">«</span>
    @else
        <a class="join-item btn" href="{{ $paginator->previousPageUrl() }}" rel="prev">«</a>
    @endif

    @foreach ($elements as $element)
        @if (is_string($element))
            <span class="join-item btn btn-disabled">{{ $element }}</span>
        @endif
        @if (is_array($element))
            @foreach ($element as $page => $url)
                @if ($page == $paginator->currentPage())
                    <span class="join-item btn btn-active">{{ $page }}</span>
                @else
                    <a class="join-item btn" href="{{ $url }}">{{ $page }}</a>
                @endif
            @endforeach
        @endif
    @endforeach

    @if ($paginator->hasMorePages())
        <a class="join-item btn" href="{{ $paginator->nextPageUrl() }}" rel="next">»</a>
    @else
        <span class="join-item btn btn-disabled">»</span>
    @endif
</nav>
@endif
